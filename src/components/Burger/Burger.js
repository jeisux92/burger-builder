import React from "react";
import classes from "./Burger.css";
import { withRouter } from "react-router-dom";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  debugger;
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey =>
      [...Array(props.ingredients[igkey])].map((_, i) => (
        <BurgerIngredient key={igkey + i} type={igkey} />
      ))
    )
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default withRouter(burger);
