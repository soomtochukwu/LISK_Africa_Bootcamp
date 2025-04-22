1. Create a table showing the contrast between :-

   a. Hardhat and foundry environments both when building,compiling and deploying smart contracts

| **Aspect**                    | **Hardhat**                                                              | **Foundry**                                                 |
| ----------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **Building Smart Contracts**  | Provides a JavaScript/TypeScript-based framework for building contracts. | Focuses on speed and simplicity with Rust-based tooling.    |
| **Compiling Smart Contracts** | Uses Solidity compiler (`solc`) with extensive configuration options.    | Uses its own fast and efficient compiler (`forge build`).   |
| **Deploying Smart Contracts** | Supports scripting and plugins for deployment (e.g., `ethers.js`).       | Deployment is handled via `forge` with minimal boilerplate. |

    b. Difference of building a smart contract using local IDE environments like visual studio rather than in remix

| **Aspect**         | **Local IDE (e.g., Visual Studio Code)**                               | **Remix**                                              |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| **Setup**          | Requires installation of dependencies like Node.js, Solidity compiler. | No setup required; runs directly in the browser.       |
| **Customization**  | Highly customizable with extensions and plugins.                       | Limited customization options.                         |
| **Debugging**      | Advanced debugging tools and integration with frameworks like Hardhat. | Built-in debugger for basic debugging.                 |
| **Collaboration**  | Requires version control tools like Git for collaboration.             | Limited collaboration features; primarily single-user. |
| **Performance**    | Dependent on local machine resources.                                  | Runs on the browser; may be slower for large projects. |
| **Offline Access** | Fully functional offline.                                              | Requires an internet connection to access.             |
