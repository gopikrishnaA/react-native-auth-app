
const sortCondition = (a, b) => {
  return a.createDate > b.createDate ? -1 : a.createDate < b.createDate ? 1 : 0;
};

const commentsParser = (items) => {
  return items
    .map((item) => ({
      id: item._id,
      joke_id: item.joke_id,
      comment: item.comment,
      createDate: new Date(item.create_date).toLocaleString()
    }))
    .sort((a, b) => sortCondition(a, b));
};

export { commentsParser };
