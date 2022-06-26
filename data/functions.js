export const getFormattedPrice = p => {
  if (!p) return "";

  const price = typeof p === "number" ? p.toString() : p;

  const reversed = price.split("").reverse();
  const priceArray = [];

  for (let i = 0; i < reversed.length;) {
    priceArray.push(`${reversed.splice(i, 3).reverse().join("")} `);
  }

  return priceArray.reverse().join("").trim();
}

export const hideBodyOverflow = state => document.body.style.overflow = state ? "hidden" : "auto"

export const getRating = comments => {
  if (!comments?.length) return 0

  const rates1 = comments.filter(cmt => cmt.rating === 1).length;
  const rates2 = comments.filter(cmt => cmt.rating === 2).length;
  const rates3 = comments.filter(cmt => cmt.rating === 3).length;
  const rates4 = comments.filter(cmt => cmt.rating === 4).length;
  const rates5 = comments.filter(cmt => cmt.rating === 5).length;

  return (((1 * rates1) + (2 * rates2) + (3 * rates3) + (4 * rates4) + (5 * rates5)) / comments.length).toFixed(1)
}

export const getPercentAgeOfRate = (i, comments) => {
  if (!comments?.length) return 0;

  const rateLength = comments.filter(cmt => cmt.rating === i).length;

  return ((rateLength * 100) / comments.length).toFixed(1);
}

export const getDiscountedPrice = (price, discount) => (discount ? price - (price * (discount / 100)) : price)?.toFixed(0);

export const insertComment = (comments, parentId, reply) => {
  for (let i = 0; i < comments?.length; i++) {
    if (comments[i].id === parentId) {
      comments[i].replies.unshift(reply);
    }
  }

  for (let i = 0; i < comments?.length; i++) {
    insertComment(comments[i].replies, parentId, reply);
  }
}
