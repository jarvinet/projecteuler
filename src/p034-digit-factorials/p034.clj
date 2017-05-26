;; 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

;; Find the sum of all numbers which are equal to the sum of the factorial of their digits.

;; Note: as 1! = 1 and 2! = 2 are not sums they are not included.


;; I think the main problem here is understanding what is the upper
;; limit for these numbers. I think there has to be one, and it is
;; probably fairly small. Once this is understood, is should be
;; simple.

;; upper limit
;; 9!*7 = 2540160 7 digits
;; 9!*8 = 2903040 7 digits

;; numbers where sum of digit factorials equals the number:
;; ([1 1] [2 2] [145 145] [40585 40585])
;; answer is 145 + 40585 = 40730

(ns projecteuler.p034)
\
(use 'clojure.math.numeric-tower)

;;debugging parts of expressions
(defmacro dbg[x] `(let [x# ~x] (println "dbg:" '~x "=" x#) x#))

(defn- factorial [n]
  (reduce * (range 1 (inc n))))

(defn- char2int [n]
  (- (int n) (int \0)))

(defn p034 []
  (filter #(= (first %) (second %))
          (for [x (range 1 2540160) :let [
                                     digits (map #(char2int %) (seq (Integer/toString x)))
                                     sum-of-digit-factorials (apply + (map factorial digits))
                                     ]]
            [x sum-of-digit-factorials])))
