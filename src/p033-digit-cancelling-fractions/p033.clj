;; The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.

;; We shall consider fractions like, 30/50 = 3/5, to be trivial examples.

;; There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

;; If the product of these four fractions is given in its lowest common terms, find the value of the denominator.


(ns projecteuler.p033)

(use 'clojure.math.numeric-tower)

;; n*10+x / d*10+x
;; x*10+n / d*10+x  
;; n*10+x / x*10+d
;; x*10+n / x*10+d

;;  n  d  x 
;; 01 05 03
;; 13/53 31/53 13/35 31/35
;; 1/5

;;  n  d  x 
;; 04 08 09
;; 49/98 49/89 94/98 94/89
;; 4/8

;;  n  d  x 
;; 04 00 09
;; 49/09 49/90 94/09 94/90
;; 4/0

;;  n  d  x 
;; 00 08 09
;; 08/89 08/98 80/89 80/89
;; 0/8

;; "is-curious-fraction" ((1 4 6) (1 5 9) (2 5 6) (4 8 9))
;; 16/46 _16/64_ 61/46 61/64
;; 1/4
;; 19/59 _19/95_ 91/59 91/95
;; 1/5
;; 26/56 _26/65_ 62/56 62/65
;; 2/5
;; 49/89 _49/98_ 94/89 94/98
;; 4/8

;; curious fraction
;; trivial -> x == 0
;; less than one in value -> n*x < d*x
;; has two digits in numerator and denominator -> n not 0 and d not 0

(defn- gen-fraction [n1 n2 d1 d2]
  (/ (+ (* n1 10) n2) (+ (* d1 10) d2)))

(defn- gen-canonical-fraction [triple]
  (let [
        n (first triple)
        d (second triple)
        x (nth triple 2)
        ]
    (gen-fraction 0 n 0 d)
  ))

(defn- gen-combinations [triple]
  (let [
        n (first triple)
        d (second triple)
        x (nth triple 2)
        f1 (gen-fraction n x d x)
        f2 (gen-fraction n x x d)
        f3 (gen-fraction x n d x)
        f4 (gen-fraction x n x d)]
  (list f1 f2 f3 f4)))

(defn- is-curious-fraction [triple]
  (let [
        n (first triple)
        d (second triple)
        all-fractions (gen-combinations triple)
        canonical-fraction (gen-canonical-fraction triple)
        ]
  (some #(= % canonical-fraction) all-fractions)))

(defn- is-not-trivial-fraction [triple]
  (let [n (first triple)
        d (second triple)
        x (nth triple 2)]
    (not= x 0)))

(defn- is-less-than-one [triple]
  (let [n (first triple)
        d (second triple)
        x (nth triple 2)]
    (< (* n x) (* d x))))

(defn- has-two-digits [triple]
  (let [n (first triple)
        d (second triple)
        x (nth triple 2)]
    (not (or (== n 0) (== d 0)))))

(defn p033 []
  (let [
        raw-fractions (for [n (range 0 10) d (range 0 10) x (range 0 10)] (list n d x))
        two-digit-fractions (filter has-two-digits raw-fractions)
        less-than-one-fractions (filter is-less-than-one two-digit-fractions)
        not-trivial-fractions (filter is-not-trivial-fraction less-than-one-fractions)
        curious-fractions (filter is-curious-fraction not-trivial-fractions)
        expanded-curious-fractions (zipmap curious-fractions (map #(gen-combinations %) curious-fractions))
        curious-fractions-canonical (map #(gen-canonical-fraction %) curious-fractions)
        curious-fractions-product (reduce * 1 curious-fractions-canonical)
        ]

    ;;(prn (for [entry expanded-curious-fractions] (list (key entry) (val entry))))

    ;; (prn (map
    ;;       (fn [entry]
    ;;         (list (gen-canonical-fraction (key entry)) (val entry)))
    ;;       expanded-curious-fractions))

    
    (prn "raw-fractions" (count raw-fractions) (take 5 raw-fractions))
    (prn "two-digit-fractions" (count two-digit-fractions) (take 5 two-digit-fractions))
    (prn "less-than-one-fractions" (count less-than-one-fractions) (take 5 less-than-one-fractions))
    (prn "not-trivial-fraction" (count not-trivial-fractions) (take 5 not-trivial-fractions))
    (prn "curious-fractions" (count curious-fractions) (take 5 curious-fractions))
    (prn "expanded-curious-fractions" expanded-curious-fractions)
    (prn "curious-fractions-canonical" curious-fractions-canonical)
    (prn "curious-fractions-product" curious-fractions-product)
    ))
