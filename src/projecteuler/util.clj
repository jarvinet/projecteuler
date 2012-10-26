(ns projecteuler.util)

(defn divides? [a b]
  (= (rem b a) 0))

(defn find-divisor [n test-divisor]
  (cond
   (> (* test-divisor test-divisor) n) n
   (divides? test-divisor n) test-divisor
   :default (find-divisor n (+ test-divisor 1))))

(defn smallest-divisor [n]
  (find-divisor n 2))

(defn prime? [n]
  (if (< n 2)
    false
    (= n (smallest-divisor n))))

(defn integers-starting-from [n]
  (lazy-seq (cons n (integers-starting-from (+ n 1)))))

(defn sieve [stream]
  (lazy-seq (cons (first stream)
                  (sieve (remove #(divides? (first stream) %)
                                 (rest stream))))))

;;(def primes (sieve (integers-starting-from 2)))

(defn lazy-primes3 []
  (letfn [(enqueue [sieve n step]
            (let [m (+ n step)]
              (if (sieve m)
                (recur sieve m step)
                (assoc sieve m step))))
          (next-sieve [sieve candidate]
            (if-let [step (sieve candidate)]
              (-> sieve
                (dissoc candidate)
                (enqueue candidate step))
              (enqueue sieve candidate (+ candidate candidate))))
          (next-primes [sieve candidate]
            (if (sieve candidate)
              (recur (next-sieve sieve candidate) (+ candidate 2))
              (cons candidate
                (lazy-seq (next-primes (next-sieve sieve candidate)
                            (+ candidate 2))))))]
    (cons 2 (lazy-seq (next-primes {} 3)))))

(defn char2int [n]
  (- (int n) (int \0)))
