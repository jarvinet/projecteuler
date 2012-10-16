;; The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.

;; Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

;; (Please note that the palindromic number, in either base, may not include leading zeros.)

(ns projecteuler.p036)

(defn- palindrome? [s]
  (cond
   (empty? s) true
   (= (count s) 1) true
   :default (and
             (= (first s) (last s))
             (palindrome? (rest (butlast s))))))

(defn p036 []
  (apply +
         (filter #(and (palindrome? (str %)) (palindrome? (Integer/toString % 2)))
                 (range 1 1000000))))
