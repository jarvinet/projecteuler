;; Take the number 192 and multiply it by each of 1, 2, and 3:

;; 192 × 1 = 192
;; 192 × 2 = 384
;; 192 × 3 = 576
;; By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and (1,2,3)

;; The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and (1,2,3,4,5).

;; What is the largest 1 to 9 pandigital 9-digit number that can be formed as the concatenated product of an integer with (1,2, … , n) where n > 1?

(ns projecteuler.p038)

(use 'projecteuler.util)

(defn- pandigital2? [n]
  (reduce #(and %1 %2)
          (for [x (range 1 10)]
            (some #(= (char2int %) x) (seq n)))))

(defn- pandigital? [n]
          (for [x (range 1 10)]
            (some #{} (seq n))))

(defn- concatenated-product [i n]
  (reduce str (map #(* i %) (range 1 n))))

(defn p038 []
  ;;  (concatenated-product 192 4)
  (prn (pandigital? "123"))
  )
