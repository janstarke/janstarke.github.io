---
layout: post
title:  "Pairing based cryptography in Rust"
date:   2021-02-13
categories: rust crypto
author: jasa
---

Because I was was fed up with catching memory issues in the legacy PBC code, I decided to reimplement the PBC library using Rust. You can watch my progress at [https://github.com/teeshop/pbc4rust](https://github.com/teeshop/pbc4rust).

By the way, I like the concept of traits. This enables me to rely on the rules of universal algebra. So, my first unit tests look like this:

```rust
#[test]
fn test_z_add_zero() {
    let a: Z = Z::from(12345 as i32);
    assert_eq!(&a + &Z::zero(), a);
    assert_eq!(&Z::zero() + &a, a);
}

#[test]
fn test_z_add_commutativity() {
    let a: Z = Z::from(12345 as i32);
    let c: Z = Z::from(6789 as i32);
    assert_eq!(&a + &c, &c + &a);
}

#[test]
fn test_z_add_associativity() {
    let a: Z = Z::from(1234 as i32);
    let b: Z = Z::from(3456 as i32);
    let c: Z = Z::from(91 as i32);
    let d: Z = Z::from(1234 + 3456 + 91 as i32);
    assert_eq!(&a + &(&b + &c), d);
    assert_eq!(&(&a + &b) + &c, d);
}
```