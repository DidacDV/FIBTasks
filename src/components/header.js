import { userIcon } from "../assets/user_icon";

export function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const nav = document.createElement("nav");
  const add_subj_btn = document.createElement("button");
  add_subj_btn.textContent = "+";
  const profile_btn = document.createElement("button");
  //adding svg to the button
  profile_btn.innerHTML = userIcon;
  const text = document.createElement("h1");
  text.classList.add("main-title");
  //modifying title -> should be an icon not a simple title (or style it so it looks like fib logo)
  text.textContent = "FIBTasks";
  nav.appendChild(add_subj_btn);
  nav.appendChild(text);
  nav.appendChild(profile_btn);

  header.appendChild(nav);
  return header;
}