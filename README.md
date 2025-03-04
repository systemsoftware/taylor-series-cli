# **Taylor Series Expansion CLI**

This is a **Node.js CLI tool** that calculates and displays the **Taylor series expansion** of a given function at a specified point. The program computes derivatives, evaluates terms, and formats the result in a human-readable way, including **colored output** for better readability.

## **Features**
✅ Computes **Taylor series expansion** of a given function.  
✅ Allows specifying the **point of expansion (a)** and **number of terms (n)**.  
✅ Supports **automatic differentiation** using `mathjs`.  
✅ Uses **color-coded output** via `chalk`.  
✅ Dynamically adjusts **terminal width** for better display.  



## **Installation**
1. Clone this repository or download the file:
   ```sh
   git clone https://github.com/systemsoftware/taylor-series-cli.git
   cd taylor-series-cli
   ```
2. Install dependencies:
   ```sh
   npm install
   ```



## **Usage**
Run the script using:
```sh
node . "<function>" <a> <n>
```
Where:
- `"<function>"` is the mathematical function (default: `"sin(x)"`)
- `<a>` is the expansion point (default: `0`)
- `<n>` is the number of terms in the Taylor series (default: `10`)

### **Example Commands**
```sh
node . "sin(x)" 5 10
```
Expands `sin(x)` around `x = 5` with `10` terms.

```sh
node . "e^x" 1 5
```
Expands `e^x` at `x = 1` using `5` terms.

```sh
node . "sin(x)e^x" 1 7
```
Expands `sin(x)e^x` at `x = 1` using `7` terms.


```sh
node . "cos(4x)" 0 4
```
Expands `cos(4x)` at `x = 0` using `4` terms.



## **Example Output**
```sh
sin(x) around 0 with 5 non-zero terms (10 max terms)

sin(x) ≈ x^1 - 1/6x^3 + 1/120x^5 - 0.000198x^7 + 0.000003x^9

```



## **How It Works**
1. **Computes derivatives** of the function using `math.derivative()`.
2. **Evaluates** each derivative at `x = a`.
3. **Divides by factorial** to compute the Taylor coefficient.
4. **Formats terms** using `formatTerm()` to maintain readability.
5. **Colors the output** using `chalk` for better visualization.
6. **Adjusts line width** dynamically based on `process.stdout.columns`.



## **Dependencies**
- **[mathjs](https://www.npmjs.com/package/mathjs)** → For symbolic differentiation and evaluation.
- **[chalk](https://www.npmjs.com/package/chalk)** → For color-coded terminal output.



## **License**
This project is **open-source** under the MIT License.



## **Contributing**
Feel free to fork and improve the project! 🚀  
If you find a bug or have a feature request, **open an issue**.

