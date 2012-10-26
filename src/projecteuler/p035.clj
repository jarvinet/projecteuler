;; The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

;; There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

;; How many circular primes are there below one million?


;; walk through all numbers from 1 to 1000000
;; for each number, generate digit rotations
;; for each digit rotation, test if it is a prime
;; if yes, add the number to circular-primes

(ns projecteuler.p035)

(use 'projecteuler.util)

(defn- array-rotate [array num-items]
  (let [
        head (take num-items array)
        tail (take-last (- (count array) num-items) array)
        ]
    (reverse (concat (reverse head) (reverse tail)))))

;; return a list of numbers where each number is obtained by rotating
;; the digits in n
;; e.g.:
;; 5 -> [5]
;; 62 -> [62 26]
;; 689 -> [689 968 896]
(defn- digit-rotations [n]
  (let [digits (map #(char2int %) (seq (Integer/toString n)))]
    (for [i (range 0 (count digits))]
      (Integer/parseInt (reduce str "" (array-rotate digits i))))))

(defn- circular-prime? [n]
  (every? prime? (digit-rotations n)))

(defn p035 []
  (count (filter circular-prime? (range 2 1000000))))

