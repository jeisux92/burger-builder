import React from "react";
import classes from "./Order.css";
const order = props => {
  let ingredientValues = null;
  if (props.ingredients) {
    ingredientValues = Object.keys(props.ingredients).map(ingKey => (
      <p
        key={ingKey}
        style={{
          display: "inline-block",
          textTransform: "capitalize",
          border: "1px solid #ccc",
          padding: "5px",
          margin: "0 8px",
        }}
      >
        {ingKey}({props.ingredients[ingKey]})
      </p>
    ));
  }
 

  return (
    <div className={classes.Order}>
      Ingredients: {ingredientValues}
      <p>
        Price: <strong>USD. {Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
