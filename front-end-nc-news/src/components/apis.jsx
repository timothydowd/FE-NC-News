import Axios from 'axios';

export const getArticlesBySort = (sortQuery) => {
    return Axios.get(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${sortQuery}`
    )
    .then(articleData => {
        return articleData.data.articles
    })
  }



  export const getArticles = (query = '') => {
    return Axios.get(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${query}`
    )
    .then(articleData => {
      return articleData.data.articles
    })
  }

  export const getTopics = () => {
    return Axios.get(
      'https://ncnewstimdowd.herokuapp.com/api/topics'
    )
    .then(topicData => {
      return topicData.data.topics
    })
  }

export default { getArticlesBySort, getArticles, getTopics }