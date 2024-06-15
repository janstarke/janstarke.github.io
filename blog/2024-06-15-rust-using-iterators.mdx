---
layout: post
title:  "Rust: Iterators are not faster, but you should use them"
date:   2024-06-15
categories: rust 
authors: [jasa]
---

Since some time, I'm wondering wether using iterators in Rust has some
benefits over traditional `for` loops.

## The idea

Consider the following loop:

```rust
let mut sum = 0;
for i in 1..=100 {
    sum += i;
}
```

which expands during execution to 

```rust
let mut sum = 0;
sum += 0;
sum += 1;
sum += 2;
// ...
```

The way we expressed the sum also defines in which order the summation
has to be done. But, to be honest, we are not interested in the concrete order.
In fact, the single summations could be done on multiple cores simultaneously.

An alternative way of implementing the above algorithm using iterators could be

```rust
let sum: u32 = (1..=100).sum();
```

Can this be faster? I don't know. So, let's use a more complicated example and check it out

## The test case

To test which approach is faster, we need to prevent the compiler to optimize too simple things. For example, the above code using the `for` loop compiles to

```asm
    xor     eax, eax
    mov     ecx, 100
    xor     edx, edx
.LBB45_1:
    mov     esi, edx
    lea     edx, [rsi, +, 1]
    cmp     esi, 100
    cmovae  edx, ecx
    add     eax, esi
    cmp     esi, 99
    ja      .LBB45_3
    cmp     edx, 101
    jb      .LBB45_1
.LBB45_3:
    ret
```

while the iterator based approach compiles to
```asm
    mov     eax, 5050
    ret
```

Of course, this results from the fact that the compiler knows a lot about the code to be optimized. So, again, we need a more complicated code.

We'll do the following:

 1. iterate through the first `1_000_000` integers, stored as `String`
 1. convert the `String` into `u64`
 1. filter out numbers which are greater or equal to `100_000`
 1. filter out numbers which are no prime numbers
 1. calculate the sum of those numbers

We use the following implementations:

### Loop approach

```rust
#[inline(never)]
fn sum1<'s>(data: impl Iterator<Item = &'s String>) -> u64 {
    let mut s = 0;
    for i in data {
        if let Ok(i) = i.parse::<u64>() {
            if i < 100_000 {
                if i.is_prime() {
                    s += i;
                }
            }
        }
    }
    s
}
```

### Iterator approach

```rust
#[inline(never)]
fn sum2<'s>(data: impl Iterator<Item = &'s String>) -> u64 {
    data.filter_map(|s| s.parse::<u64>().ok())
        .filter(|i| i < &100_000)
        .filter(|i| i.is_prime())
        .sum()
}
```

### Common code

To implement the `is_prime` method, I use the following simple code, which is using the [primes](https://crates.io/crates/primes) crate:

```rust
trait IsPrime {
    fn is_prime(&self) -> bool;
}

impl IsPrime for u64 {
    fn is_prime(&self) -> bool {
        primes::is_prime(*self)
    }
}
```

In addition, I generate a static data array `NUMBERS`:

```rust
lazy_static! {
    static ref NUMBERS: Vec<String> = (1..1_000_000).map(|i| format!("{i}")).collect();
}
```

### Benchmarking code

To test the speed of the above code, I'm using `cargo bench` with the following test code 

```rust

#[cfg(test)]
mod tests {
    use super::*;
    use test::Bencher;

    #[bench]
    fn test_sum1(b: &mut Bencher) {
        b.iter(|| assert_eq!(sum1(NUMBERS.iter()), 454396537))
    }

    #[bench]
    fn test_sum2(b: &mut Bencher) {
        b.iter(|| assert_eq!(sum2(NUMBERS.iter()), 454396537))
    }
}

```

## Benchmarking results

Running the benchmark yields the following result:

```
test tests::test_sum1 ... bench:  25,637,873.10 ns/iter (+/- 1,921,695.73)
test tests::test_sum2 ... bench:  25,639,836.30 ns/iter (+/- 1,405,975.61)
```

OMG, what has happened???!!? Both approaches are equally performant. There seems to be no important difference between using a loop or iterator.

**That's our first result: It doesn't matter wether you use traditional loops or iterators. You can expect both to be similar fast.**

## Iterators on steroids

Let's change out iterator based sum function a little bit: replacing `Iterator` by `ParallelIterator`, which is a trait from the [rayon](https://crates.io/crates/rayon) crate. *rayon* allows you to do anything in parallel what you can do with normal iterators. So, if you have some code which is based on using iterators, you can simply switch to parallel iterators.

We add an additional sum function:

```rust

#[inline(never)]
fn sum3<'s>(data: impl ParallelIterator<Item = &'s String>) -> u64 {
    data.filter_map(|s| s.parse::<u64>().ok())
        .filter(|i| i < &100_000)
        .filter(|i| i.is_prime())
        .sum()
}
```

Be aware that the only difference to `sum2` is the trait `ParallelIterator`. No other code change is necessary.

Also, we need a benchmarking function:

```rust
#[bench]
fn test_sum3(b: &mut Bencher) {
    b.iter(|| assert_eq!(sum3(NUMBERS.par_iter()), 454396537))
}
```

As you can see, there is another difference: to create a `ParallelIterator`, we use the function `par_iter()` instead of `iter()`. So, you have the full control wether you want to use parallel iterators or not.

### Benchmarking parallel iterators

The benchmarking result (on a system with 4 virtual CPUs) is very informative:

```
test tests::test_sum1 ... bench:  25,621,303.60 ns/iter (+/- 1,528,567.84)
test tests::test_sum2 ... bench:  25,752,965.60 ns/iter (+/- 2,927,367.52)
test tests::test_sum3 ... bench:  11,761,348.20 ns/iter (+/- 2,472,399.91)
```

We can conclude:
 - using the parallel iterator in our test case is significantly faster
 - migrating the code from traditional iterators to parallel iterators is simple

## Conclusion

It doesn't matter if you use traditional loops or iterators. There will be no significant performance impact. But, if you want to be able to do significant changes, such as distributing loop iterations over multiple CPUs, without breaking your code, use iterators.

## One more thing

It is very important to implement you algorithm in the right way. But it is more important to understand the algorithm in detail, and to keep your implementation as neat to that as possible. 

For example, let's change `sum1` by inserting a `break`:

```rust

#[inline(never)]
fn sum1<'s>(data: impl Iterator<Item = &'s String>) -> u64 {
    let mut s = 0;
    for i in data {
        if let Ok(i) = i.parse::<u64>() {
            if i >= 100_000 {
                break;
            }
            if i.is_prime() {
                s += i;
            }
        }
    }
    s
}
```

and again benchmarking:

```rust
test tests::test_sum1 ... bench:  11,603,891.70 ns/iter (+/- 742,577.75)
test tests::test_sum2 ... bench:  25,899,039.20 ns/iter (+/- 1,916,178.50)
test tests::test_sum3 ... bench:  11,899,570.60 ns/iter (+/- 5,477,771.27)
```

What has happened? Clearly, it doesn't make sense to iterate through `1_000_000` numbers, while we're only interested in the first `100_000`. Because when using a loop we know the order of the execution, we can abort as soon as we crossed the border to uninteresting numbers (those above `100_000`). In our test case, this has a similar effect to the performance such as using parallel iterators.

So, again: First you need to completely understand your problem, choose the best matching algorithm, and implement it correctly. Then, you can optimize.