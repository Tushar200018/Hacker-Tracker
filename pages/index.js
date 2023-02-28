import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from "axios";
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [searchVal,setSearchVal] = useState("");
  const [newsList,setNewsList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    async function fetchList(){
      try{
        setIsLoading(true);
        const result = await axios.get(`https://hn.algolia.com/api/v1/search?query=${searchVal}`);
        const list = [];
        result.data.hits.forEach(news=>{
          const {title,story_text,objectID,story_title,...rest} = news;
          list.push({
            title: title,
            story_text: story_text,
            objectID: objectID,
            story_title: story_title
          })
        })
        setNewsList(list);
        setIsLoading(false);
      }catch(e){
        console.log("Error in fetching the results ",e);
      }
    }
    fetchList();
  },[searchVal])



  function handleChange(e){
    setSearchVal(e.target.value);
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image src="/hacker_pic_2.png" fill></Image>
        </div>
        <form>
            <div className={styles.searchGroup}>
              <input value={searchVal} onChange={handleChange} placeholder='Search Hacker News' />
              <span>
                <i className="fa fa-search"></i>
              </span>
            </div> 
          </form>
          {searchVal!=="" && (isLoading 
            ?
            <p>Loading...</p>
            :
            <div className={styles.searchResults}>
                <div className={`mt-3`}>
                  {(newsList.length==0 
                    ? <h1>{`Sorry, we couldn't find search results for "${searchVal}"`}</h1>
                    : <h1>{`${newsList.length} Search Results found for "${searchVal}"`}</h1>
                    )}
                </div>
                <div className='mt-5'>
                  {newsList.map(news=>(
                  <div className={styles.searchItem}>
                    <h4>{news.title ? news.title : (news.story_title ? news.story_title : news.story_text)}</h4>
                    <Link href={`/posts/${news.objectID}`}>{`View Post >`}</Link>
                  </div>
                  ))}
                </div>
            </div>
          )}
      </div>
        
    </div>
  )
}
