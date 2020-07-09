(ns ^:dev/always app.core
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]))

(defn ui []
  [:div "ziemniak"])

(defn render-ui []
  (let [dom-node (js/document.getElementById "app")]
    (rdom/render [ui] dom-node)))

(defn ^:export reload! []
  (render-ui))

(def ^:export main! render-ui)
