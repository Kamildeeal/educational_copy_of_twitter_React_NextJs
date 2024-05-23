"use client";
import { atom } from "recoil";
import { AtomKeys } from "./atomKeys";

export const modalState = atom<boolean>({
  key: AtomKeys.ModalState,
  default: false,
});

export const postIdState = atom<string>({
  key: AtomKeys.PostIdState,
  default: "id",
});

export const loadingState = atom<boolean>({
  key: AtomKeys.LoadingState,
  default: false,
});
