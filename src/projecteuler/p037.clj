;; The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.

;; Find the sum of the only eleven primes that are both truncatable from left to right and right to left.

;; NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.

(ns projecteuler.p037)

(use 'projecteuler.util)

(defn- right-truncatable-prime? [n]
  (cond
   (empty? n) true
   :default (and (prime? (Integer/parseInt n))
                 (right-truncatable-prime? (subs n 0 (- (count n) 1))))))

(defn- left-truncatable-prime? [n]
  (cond
   (empty? n) true
   :default (and (prime? (Integer/parseInt n))
                 (left-truncatable-prime? (subs n 1)))))

(defn- truncatable-prime? [n]
  (and (right-truncatable-prime? n)
       (left-truncatable-prime? n)))

(defn p037 []
  (filter #(truncatable-prime? (str %)) (take 1100 primes)))
