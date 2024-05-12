import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import styles from "./RightSideBar.module.css";
import News from "../leftSideHomePage/News";

type NewsResult = {
  title: string;
};

export default function RightSideBar() {
  const [news, setNews] = useState<NewsResult[]>([]);
  const [newsNumber, setNewsNumber] = useState<number>(2);
  const [followUser, setFollowUser] = useState<any[]>([]);
  const [followerNumber, setFollowersNumber] = useState<number>(3);

  async function fetchNews() {
    const newsResults = await fetch(
      "https://saurav.tech/NewsAPI/everything/cnn.json"
    ).then((res) => res.json());
    // console.log(newsResults);
    const articles = newsResults.articles;
    setNews(articles);
  }
  async function whoToFollow() {
    const randomUsers = await fetch(
      "https://randomuser.me/api/?results=20&inc=name,login,picture"
    ).then((res) => res.json());
    const users = randomUsers.results;
    setFollowUser(users);
  }
  useEffect(() => {
    fetchNews();
    whoToFollow();
  }, []);

  return (
    <div className={styles.widgets}>
      <div className={styles.header_background}>
        <div className={styles.container_searchBox}>
          <div className={styles.searchBox}>
            <IoSearch className={styles.icon} />
            <input
              className={styles.input}
              type="text"
              placeholder="Search Twitter"
            ></input>
          </div>
        </div>
      </div>
      <div className={styles.news}>
        <h4>
          Some news <p>from free API - https://saurav.tech/NewsAPI/</p>
        </h4>
        {news.slice(0, newsNumber).map((article: any) => {
          return <News key={article.title} article={article} />;
        })}
        <button
          className={styles.btn_loadmore}
          onClick={() => setNewsNumber((newsNumber) => newsNumber + 2)}
        >
          Load more news
        </button>
      </div>
      <div className={styles.follow_section}>
        <h4>
          Who to Follow <p> from free API - https://randomuser.me</p>
        </h4>
        {followUser.slice(0, followerNumber).map((randomUser) => {
          return (
            <div
              className={styles.container_follow_user}
              key={randomUser.login.username}
            >
              <img src={randomUser.picture.thumbnail} alt="user_pic" />
              <div className={styles.user_info}>
                <h4>{randomUser.name.first + " " + randomUser.name.last}</h4>
                <h5>{"@" + randomUser.login.username}</h5>
              </div>
              <button>Follow</button>
            </div>
          );
        })}
        <button
          className={styles.btn_loadmore}
          onClick={() =>
            setFollowersNumber((followerNumber) => followerNumber + 2)
          }
        >
          Load more users
        </button>
      </div>
    </div>
  );
}

//LATER
//RESOLVE WHY THIS METHOD DOESNT WORK
// type Repo = {
//   article: string;
//   title: string;
// };

// export async function getStaticProps() {
//   const response = await fetch(
//     "https://saurav.tech/NewsAPI/everything/cnn.json"
//   );
//   const newsData: any = await response.json();
//   return {
//     props: {
//       newsData,
//     },
//   };
// }
