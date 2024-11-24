import { user_icon } from "../assets/user_icon";
import { fib_logo } from "../assets/fib_logo";

export function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const nav = document.createElement("nav");
  const profile_btn = document.createElement("button");
  //adding svg to the button
  profile_btn.innerHTML = user_icon;
  const text = document.createElement("h1");
  text.classList.add("main-title");
  
  //modifying title -> should be an icon not a simple title (or style it so it looks like fib logo)
  text.innerHTML = fib_logo;
  nav.appendChild(text);
  nav.appendChild(profile_btn);

  header.appendChild(nav);
  return header;
}