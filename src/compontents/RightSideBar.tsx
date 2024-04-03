import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import styles from "./RightSideBar.module.css";
import News from "./News";

type NewsResult = {
  title: string;
};

export default function RightSideBar({ newsResults }: any) {
  const [news, setNews] = useState<NewsResult[]>([]);

  async function fetchNews() {
    const newsResults = await fetch(
      "https://saurav.tech/NewsAPI/everything/cnn.json"
    ).then((res) => res.json());
    console.log(newsResults);
    const articles = newsResults.articles;
    setNews(articles);
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
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
      <div className={styles.news}>
        <h4>Past news from free API - https://saurav.tech/NewsAPI/</h4>
        {news.map((article: any) => {
          return <News key={article.title} article={article} />;
        })}
        <button>Load more!</button>
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
