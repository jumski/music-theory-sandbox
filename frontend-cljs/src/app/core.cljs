(ns ^:dev/always app.core
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [re-frame.core :as rf]))

(defonce initial-state
  {:counter 0})

(rf/reg-event-fx
  :initialize-db
  (fn [& args]
    {:db initial-state}))

(rf/reg-event-db
  :update-counter
  (fn [db [_ delta]]
    (update-in db [:counter] (partial + delta))))

(rf/reg-sub
  :counter
  (fn [db _]
    (:counter db)))

(defn counter-component []
  (let [counter (rf/subscribe [:counter])]
    [:<>
     [:button {:on-click #(rf/dispatch [:update-counter -1])} "-"]
     [:span (str "counter =" @counter)]
     [:button {:on-click #(rf/dispatch [:update-counter 1])} "+"]]))

;;; META stuff

(defn ui []
  [:div [counter-component]])

(defn render-ui []
  (let [dom-node (js/document.getElementById "app")]
    (rdom/render [ui] dom-node)))

(defn ^:export reload! []
  (render-ui))

(defn ^:export main! []
  (rf/dispatch-sync [:initialize-db])
  (render-ui))

