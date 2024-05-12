import React from "react";
import styles from "./News.module.css";

export default function News({ article }: any) {
  return (
    <a href={article.url} target="_blank" className={styles.a}>
      <div className={styles.container}>
        <div>
          <h5 className={styles.title}>{article.title}</h5>
          <p className={styles.source}>{article.source.name}</p>
        </div>
        <img
          className=""
          width="140"
          height="140"
          src={article.urlToImage}
          alt=""
        />
      </div>
    </a>
  );
}
