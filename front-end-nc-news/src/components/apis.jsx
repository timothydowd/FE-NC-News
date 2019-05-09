import Axios from 'axios';



  export const getArticles = (query1 = '', query2 = '') => {
    let query2Formatted = ''
    if(query2 !== '' && query1!== ''){
      query2Formatted = `&${query2.slice(1)}`
      
    }
    else {
      query2Formatted = query2
    }

    console.log(`https://ncnewstimdowd.herokuapp.com/api/articles/${query1}${query2Formatted}`)
    return Axios.get(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${query1}${query2Formatted}`
    )
    .then(articleData => {
      return articleData.data.articles
    })
  }


  export const deleteArticle = (articleId) => {
   
    return Axios.delete(
      `https://ncnewstimdowd.herokuapp.com/api/articles/${articleId}`
    )
    .then(status => {
      console.log(status)
    })
  }

  export const deleteComment = (commentId) => {
   
    return Axios.delete(
      `https://ncnewstimdowd.herokuapp.com/api/comments/${commentId}`
    )
    .then(status => {
      console.log(status)
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

  export const postTopic = (slug, description) => {
     return Axios.post(
      `https://ncnewstimdowd.herokuapp.com/api/topics`,
      {
        slug,
        description
      }
    ).then((status) => console.log(status))

  }

  export const postArticle = (title, body, topic, username) => {
    return Axios.post(
     `https://ncnewstimdowd.herokuapp.com/api/articles`,
     {
       title,
       body,
       topic,
       username
     }
   ).then((status) => console.log(status))

  
 }

 export const getUser = (username = '') => {
  return Axios.get(
    `https://ncnewstimdowd.herokuapp.com/api/users/${username}`
  ).then((userData) => {
    if(Array.isArray(userData)) return userData.data.users
    else return userData.data.user
  }).catch(err => {
    console.log(err)
  })
}

export const patchVoteByCommentId = (like, commentId) => {
  return Axios.patch(
     `https://ncnewstimdowd.herokuapp.com/api/comments/${commentId}`,
     {inc_votes: like}
   )
   .then((updatedComment) => {
     return updatedComment
       //return updatedComment.data.updatedArticle
        
   })
}

export const patchVoteByArticleId = (like, articleId) => {
  return Axios.patch(
     `https://ncnewstimdowd.herokuapp.com/api/articles/${articleId}`,
     {inc_votes: like}
   )
   .then((articleData) => {
       return articleData.data.updatedArticle
        
   })
}

export const getArticleById = (articleId) => {
  return Axios.get(
    `https://ncnewstimdowd.herokuapp.com/api/articles/${articleId}`
  )
  .then(articleData => {
      return articleData.data.article
  })
}

export const getCommentsByArticleId = (articleId) => {
  return Axios.get(
     `https://ncnewstimdowd.herokuapp.com/api/articles/${articleId}/comments`
  )
  .then(commentsData => {
       return commentsData.data.commentsByArticleId
  })
}

export default {  getArticles, getTopics, postTopic, deleteArticle, deleteComment, patchVoteByCommentId, patchVoteByArticleId, getArticleById, getCommentsByArticleId }