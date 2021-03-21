---
layout: post
title:  "Modular square root"
date:   2021-02-22
categories: rust crypto
---

Finally, I managed to implement the Tonelli-Shanks-Algorithm (https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm) in Rust, and I learned a lot by doing it:

* Rusts BigInt does not provide methods for doing fundamental modular arithmetics, such as power or gcd
* There is a fork of `BigInt`, which is named `num-bigint-dig` (https://crates.io/crates/num-bigint-dig), which provides at least `modpow`
* There is no simple way to generate random BigInt values in Rust

Using this knowledge, I decided to use `gmp::mpz::Mpz` for doing arithmetics with big integers. However, here is my solution:

{% highlight rust %}
// Legendre symbol, returns 1, 0, or -1 mod p
fn ls(a: &Mpz, p: &Mpz) -> Mpz {
    let exp = (p-Mpz::one()) / Mpz::from(2 as u32);
    a.powm(&exp, p)
}
// Tonelli-Shanks algorithm
impl SquareRoot for Zr {
    type Item = Zr;
    fn sqrt(&self) -> Option<(Self,Self)> {
        // for better readability
        let n = &self.value;
        let p = &self.order;
 
        if ! ls(n, p).is_one() {
            return None;
        }
        
        let mut q = p - 1;
        let mut s = Mpz::zero();
        while ((&q) & &Mpz::one()).is_zero() {
            s += 1;
            q >>= 1
        }
        
        if s.is_one() {
            let exp = (p+1)/4;
            let r1 = self.value.powm(&exp, p);
            let res2 = Zr{value: p - (&r1), order: (*p).clone()};
            let res1 = Zr{value: r1,        order: (*p).clone()};
            return Some((res1, res2));
        }
        
        let mut z = Mpz::from(2);
        while ls(&z, p) != p-1 {
            z += 1
        }
        let mut c = z.powm(&q, p);
        
        let mut r = n.powm(&(((&q)+1)/2), p);
        let mut t = n.powm(&q, p);
        let mut m = s;
        
        loop {
            if t.is_one() {
                let res2 = Zr{value: p - &r, order: (*p).clone()};
                let res1 = Zr{value: r,      order: (*p).clone()};
                return Some((res1, res2));
            }
            
            let mut i = Mpz::zero();
            let mut z = t.clone();
            let mut b = c.clone();
            while !z.is_one() && &i < &(&m - 1) {
                z = (&z) * (&z) % p;
                i += 1;
            }
            let mut e = &m - &i - 1;
            while &e > &Mpz::zero() {
                b = (&b) * (&b) % p;
                e -= 1;
            }
            r = (&r) * (&b) % p;
            c = (&b) * (&b) % p;
            t = (&t) * (&c) % p;
            m = i;
        }
    }
}
{% endhighlight %}