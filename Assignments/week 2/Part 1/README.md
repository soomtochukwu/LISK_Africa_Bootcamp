1. Create a table showing the contrast between:-

   a. Hardhat and foundry environments, both when building, compiling, and deploying smart contracts

| **Aspect**                    | **Hardhat**                                                              | **Foundry**                                                 |
| ----------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **Building Smart Contracts**  | Hardhat uses JavaScript to scaffold a development environment. This makes things easy since most developers are JS developers | It's just good enough for advanced solidity builders.    |
| **Compiling Smart Contracts** | It employs the Solidity compiler (`solc`), powered with JS syntax(npx), with extensive configuration options to make, making deployment simple.    | Uses its own fast and efficient compiler (`forge build`).   |
| **Deploying Smart Contracts** | Hardhat allows developers to write highly customizable script(s) for deployment and verification.       | Foundry (Forge) is not all that flexible. |

    b. Difference of building a smart contract using local IDE environments like Visual Studio rather than in Remix

| **Aspect**         | **Local IDE (e.g., Visual Studio Code)**                               | **Remix**                                              |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| **Setup**          | Requires installation of dependencies like Node.js, Solidity compiler. | No setup required; runs directly in the browser.       |
| **Customization**  | Highly customizable with extensions and plugins.                       | Limited customization options.                         |
| **Debugging**      | Advanced debugging tools and integration with frameworks like Hardhat. | Built-in debugger for basic debugging.                 |
| **Collaboration**  | Requires version control tools like Git for collaboration.             | Limited collaboration features; primarily single-user. |
| **Performance**    | Dependent on local machine resources.                                  | Runs on the browser; may be slower for large projects. |
| **Offline Access** | Fully functional offline.                                              | Requires an internet connection to access.             |
