import modal
import os
import aiohttp
import openai
from bs4 import BeautifulSoup
import ast
# Set up the Modal stub

# Set up an image for aiohttp, openai and other required tools
research_image = modal.Image.debian_slim(
    python_version="3.10"
).pip_install("aiohttp", "openai", "bs4")
stub = modal.Stub("market-research", image=research_image, secrets=[modal.Secret.from_name("my-custom-secret")])
# Set up OpenAI key
# openai.api_key = os.getenv("OpenAI_API_Key")
# NEWSAPI_KEY = os.getenv("News_API_Key")
# print(openai.api_key)
# print(NEWSAPI_KEY)

slack_sdk_image = modal.Image.debian_slim().pip_install("slack-sdk","aiohttp", "openai", "bs4")
@stub.function()
async def scrape_and_summarize(url) -> str:
    """
    Scrapes the content of the article from the given URL, cleans the content, 
    and then uses OpenAI's API to summarize the article.
    """
    openai.api_key = os.environ["OpenAI_API_Key"]
    if url == None or url == "None":
        return ""
    print(f"Scraping and summarizing {url[:50]}...")
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url) as response:
                page_content = await response.text()
        except:
            return ""

    soup = BeautifulSoup(page_content, 'html.parser')
    paragraphs = soup.find_all('p')
    article_content = ' '.join([para.get_text() for para in paragraphs])
    # print(article_content)
    response = openai.ChatCompletion.create(
        # model="gpt-3.5-turbo-16k",
        model="gpt-4",
        messages=[
            {
            "role": "user",
            "content": f"Summarize the following article content in two sentences: {article_content}"
            }
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    summary_response = response
    summary = summary_response.choices[0].message.content.strip()
    print(f"Finished summarizing {url[:50]}...")
    return summary

@stub.function()
async def fetch_research_data(prompt: str) -> dict:
    print(list(os.environ.keys()))
    openai.api_key = os.environ["OpenAI_API_Key"]
    NEWSAPI_KEY = os.environ["News_API_Key"]
    # Summarize the prompt
    print(prompt)
    
    BASE_URL_HN = f"https://hn.algolia.com/api/v1/search_by_date?query={prompt}"
    BASE_URL_NEWSAPI = "https://newsapi.org/v2/everything"
    headers = {"Authorization": NEWSAPI_KEY}
    params = {
        "q": prompt,
        "pageSize": 10,
        "language": "en",
        "sortBy": "publishedAt",
        # "sources": "techcrunch"
    }

    # Fetch from HackerNews
    async with aiohttp.ClientSession() as session:
        async with session.get(BASE_URL_HN) as response:
            hn_data = await response.json()

    # Fetch from TechCrunch via NewsAPI
    async with aiohttp.ClientSession() as session:
        async with session.get(BASE_URL_NEWSAPI, headers=headers, params=params) as response:
            techcrunch_data = await response.json()

    return {"hn": hn_data, "techcrunch": techcrunch_data}

@stub.function(
    image=slack_sdk_image, secret=modal.Secret.from_name("my-slack-secret")
)
def post_to_slack(channel, data):
    import slack_sdk

    client = slack_sdk.WebClient(token=os.environ["SLACK_BOT_TOKEN"])
    client.chat_postMessage(channel=channel, text="HackerNews Results:")
    for result in data['hn']['hits']:
        client.chat_postMessage(channel=channel, text=f"{result['title']} - {result['url']}")
    
    client.chat_postMessage(channel=channel, text="\nTechCrunch Results:")
    for article in data['techcrunch']['articles']:
        client.chat_postMessage(channel=channel, text=f"{article['title']} - {article['url']}")

@stub.function(
        
)
def get_relevant(articles, topic):
    # print(articles.keys())
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        # model="gpt-4",
        messages=[
            {
            "role": "user",
            "content": f"Given the topic {topic}, which of the following titles are relevant? {list(articles.keys())}"
            }
        ],
        temperature=1,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    return response.choices[0].message.content.strip()
#only leave .remote on "entry point"
#rest is local
@stub.function()
async def run(prompt):
    # prompt = input("Enter text for market research: ")
    # prompt = "Edtech trends"
    data = await fetch_research_data.local(prompt)
    articles = {}
    for article in data['hn']['hits']:
        if article['title'] != None and article['title'] != 'None':
            articles[article['title']] = article['url']
    for article in data['techcrunch']['articles']:
        if article['title'] != None and article['title'] != 'None':
            articles[article['title']] = article['url']
    relevant = get_relevant.local(articles, prompt)
    # print(len(relevant))
    summaries = {}
    temp1 = []
    temp2 = []
    for rel in articles.keys():
        if rel not in relevant:
            continue
        link = articles.get(rel)
        summaries[rel] = {}
        temp1.append(link)
        temp2.append(rel)
    print(f"number of links to summarize: {len(temp1)}")
    all_summaries = list(scrape_and_summarize.map.aio(temp1))
    for i in range(len(temp1)):
        summary = all_summaries[i]
        title = temp2[i]
        if temp1[i] == None:
            temp1[i] = ""
        summaries.get(title)['link'] = temp1[i]
        summaries.get(title)['summary'] = summary
    return summaries
        

    # print(summaries)
    # return summaries
    # send_to_slack = input("Send results to Slack? (y/n): ")
    # send_to_slack = "y"
    # if send_to_slack.lower() == 'y':
    #     slack_channel = "#hackathon"
    #     # slack_channel = input("Enter Slack channel (e.g., #research-results): ")
    #     post_to_slack.remote(slack_channel, data)
# if __name__ == "__main__":
#     run("Edtech trends")

# @stub.local_entrypoint()
# def main():
#     res = run.remote("Edtech trends")
#     print(res)