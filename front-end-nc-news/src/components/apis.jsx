import Axios from 'axios';

export const getArticlesBySort = (sortQuery) => {
    return Axios.get(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${sortQuery}`
    )
    .then(articleData => {
        return articleData.data.articles
    })
  }

export default getArticlesBySort