import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

type NewsData = {
  // określ strukturę danych, jeśli znasz ją z góry
};

const initialData: NewsData[] = [];

export const NewsContext = createContext(initialData);

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [newsData, setNewsData] = useState<NewsData[]>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://saurav.tech/NewsAPI/everything/cnn.json"
        );
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <NewsContext.Provider value={newsData}>{children}</NewsContext.Provider>
  );
};
