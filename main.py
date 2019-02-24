import requests
from bs4 import BeautifulSoup

def user_not_exists(list):
    if(len(list)==1 and list[0]=="-1"):
        return True
    return False

def scrape(username):
    list = []
    url = "https://www.spoj.com/users/"+username
    data = requests.get(url)
    soup = BeautifulSoup(data.text,'html.parser')
    try:
        tablesoup = (soup.find("div",{"id":"user-profile-tables"})).contents[1].contents[3]
    except:
        print("username does not exist")
        list.append("-1")
        return list
    cnt = 1
    for rowsoup in tablesoup.children:
        if(cnt%2==0):
            dcnt = 1
            for tdsoup in rowsoup.children:
                if(dcnt%2==0):
                    pname = tdsoup.contents[0].text
                    if(pname!=""):
                        list.append(pname)
                dcnt=dcnt+1
        cnt=cnt+1
    return list

def diff(mlist, flist):
    todo_list = []
    for item in flist:
        if item not in mlist:
            todo_list.append(item)
    todo_list.sort()
    return todo_list

def main(user,frnd):
    todo_list = ["-1"]
    mlist = scrape(user)
    if(user_not_exists(mlist)):
        return todo_list
    
    flist = scrape(frnd)
    if(user_not_exists(flist)):
        return todo_list

    todo_list = diff(mlist,flist)
    return todo_list