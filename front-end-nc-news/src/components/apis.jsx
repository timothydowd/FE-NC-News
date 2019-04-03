import Axios from 'axios';

export const getArticleById = (articleId) => {
    return Axios.get(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${articleId}`
    )
    .then(articleData => {
        return articleData.data.article
    })
  }

