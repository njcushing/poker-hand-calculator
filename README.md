<a name="readme-top"></a>

<!-- Project Shields -->

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- Project Information Overview -->
<br />
<div align="center">
  <h3 align="center">Poker Hand Calculator</h3>

  <p align="center">
    An application that allows the user to create a scenario in a game of Texas Hold 'Em poker in order to determine which hand(s) is/are the winner(s).
    <br />
    <br />
    <!-- <a href="https://njcushing-poker-hand-calculator.fly.dev">View Live Demo</a> -->
  </p>
</div>

<!-- Table of Contents -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#settings">Settings</a></li>
        <li>
          <a href="#simulator">Simulator</a>
          <ul>
            <li><a href="#hands">Hands</a></li>
            <li><a href="#board">Board</a></li>
          </ul>
        </li>
        <li><a href="#hand-rankings">Hand Rankings</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- About the Project -->

## About the Project

![Overview](https://res.cloudinary.com/djzqtvl9l/image/upload/v1737132057/poker-hand-calculator/overview_1280_960_q4xn9s.png)

This application allows the user to design a scenario in a game of Texas Hold 'Em poker. The rules for how the strongest hand(s) is/are determined is explained in the application's 'Hand Rankings' tab. By setting the number of hands in play, the current 'street' to determine the number of cards on the board, and by selecting the cards in each hand and on the board, any Texas Hold 'Em hand can be simulated for between 1 and 9 players inclusive. The application will tell you which hand(s) is/are currently in the strongest position or, if the current street is 'river' (all the board cards have been dealt), which hand(s) is/are the winner(s).

The application uses a responsive layout; this makes it suitable for many screen sizes.

<p align="center">
  <img src="https://res.cloudinary.com/djzqtvl9l/image/upload/v1737133919/poker-hand-calculator/mobile_layout_360_800_sgzyn4.png" alt="Mobile layout" style="width:285px;"/>
</p>

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

### Built With

[![TypeScript][TypeScript]][TypeScript-url]  
[![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

<!-- Getting Started -->

## Getting Started

If you want to get this project running yourself, please follow these steps.

### Prerequisites

- Install npm and NodeJS by following this [tutorial][npm-nodejs-install-tutorial-url]

### Installation

1. Clone the repository
    ```sh
    git clone https://github.com/njcushing/poker-hand-calculator.git
    ```
2. Install the application's dependencies
    ```sh
    npm install
    ```
3. Run the npm script for compiling and starting the application
    ```sh
    npm run start:front
    ```
4. Navigate to the client's domain in your chosen browser

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

<!-- Usage -->

## Usage

### Settings

Locate the 'Design' tab in the application. In this view, there should be settings available to help configure the current scenario being simulated:

- 'Number of Hands': the number of hands to be included in the simulation
- 'Street': the current 'phase' of the game; this contains a number of options and determines the quantity of cards on the board

![Design tab](https://res.cloudinary.com/djzqtvl9l/image/upload/v1737134224/poker-hand-calculator/design_tab_kavdvj.png)

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

### Simulator

The Simulate tab contains the hands you've designed and the cards on the board.

![Simulate tab](https://res.cloudinary.com/djzqtvl9l/image/upload/v1737136018/poker-hand-calculator/simulate_tab_smaller_lffiua.png)

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

#### Hands

Each hand contains two 'hole cards'; these are chosen at random when the hand is first added. The simulation can contain between 1 and 9 hands inclusive.

The application will automatically calculate which of the hands is currently strongest and, for the hand(s) that is/are the best, a green tick will be displayed in the top-right of the hand(s).

A hand has multiple options:

- Shuffle: choose two new hole cards for this hand at random from the available cards remaining in the deck. The hand's cards are deposited into the deck first, so it is possible for the same cards to be reselected.
- Delete: delete this hand (this option will not be available if there is only one hand currently in the simulation).
- Show: display the best five-card combination between this hand's hole cards and the community cards on the board. If the current street is 'Pre-flop', there will be no cards on the board to highlight.

![Hands](https://res.cloudinary.com/djzqtvl9l/image/upload/v1737134670/poker-hand-calculator/hands_aqjngv.png)

In the above image, Hand 1 is the winner, indicated by the green tick and thicker outline.

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

#### Board

The number of cards displayed on the board is determined by the current 'street' assigned in the Design tab:

- 'Pre-flop': 0 cards
- 'Flop': 3 cards
- 'Turn': 4 cards
- 'River': 5 cards

Similarly to each hand, the board has a shuffle button, which replaces all the cards on the board with ones at random from the available cards remaining in the deck. Again, the board's cards are deposited into the deck first, so it is possible for the same cards to be reselected.

![Board](https://res.cloudinary.com/djzqtvl9l/image/upload/v1737134669/poker-hand-calculator/board_nepv2q.png)

#### Cards

The game of Texas Hold 'Em uses a standard 52-card deck. Each hand, as well as the board when the current street is anything other than 'Pre-flop', will display a number of cards. These cards can be changed manually by clicking them; this opens an additional UI displaying the current card to be swapped, in addition to a list of the available cards remaining in the deck (as every card currently 'in play' must be unique). Simply clicking one of the available cards will cause it to replace the one to be swapped.

![Card selection UI](https://res.cloudinary.com/djzqtvl9l/image/upload/v1737135817/poker-hand-calculator/hands_smaller_nkqfbp.png)

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

### Hand Rankings

The Hand Rankings tab displays each of the possible rankings a hand can have in a typical Texas Hold 'Em scenario, and describes what causes a specific combination of cards to have that ranking.

![Hand Rankings tab](https://res.cloudinary.com/djzqtvl9l/image/upload/v1737135816/poker-hand-calculator/hand_rankings_tab_smaller_dhhhlj.png)

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

<!-- License -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

<!-- Contact -->

## Contact

Niall Cushing - [LinkedIn][linkedin-url]

Project Link: [https://github.com/njcushing/poker-hand-calculator][project-link]

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

<!-- Markdown Links & Images -->

[npm-nodejs-install-tutorial-url]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
[project-link]: https://github.com/njcushing/poker-hand-calculator
[license-shield]: https://img.shields.io/github/license/njcushing/poker-hand-calculator.svg?style=for-the-badge
[license-url]: https://github.com/njcushing/poker-hand-calculator/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/in/niall-cushing
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=FFF
[TypeScript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
