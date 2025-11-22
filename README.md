# Project Setup and Design Overview

## Live Link

https://assignments-rho-eight.vercel.app/

## Setup and Installation

To run this project locally, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Design Challenges

During the development of this project, I encountered and overcame several design challenges:

### 1. Line Chart Implementation
One of the initial challenges was implementing the line chart exactly as per the design specifications. Integrating the radiant effects within the charting library proved difficult. I had to iterate on the configuration and styling to achieve the desired visual outcome, ensuring the gradient and glow effects matched the mockup.

### 2. Donut Chart Sector Overlap
Implementing the overlapping sectors in the donut chart presented a significant challenge. I initially faced issues with `z-index` management, where one sector would overlap two others instead of just the adjacent one (e.g., z-index > 2 rather than > 1). To resolve this, I changed my approach and utilized a layered structure. This allowed for precise control over the stacking order, ensuring the illusion of each sector overlapping its neighbor correctly as intended in the design.

## Micro-interactions

To enhance the user experience, I added several micro-interactions throughout the application:

-   **Hover States**: Interactive elements feature smooth hover effects to provide immediate visual feedback.
-   **Active States**: Active states are clearly distinguished to indicate selection or activation.
-   **Minimal Interactions**: Subtle animations and transitions were incorporated to make the interface feel more dynamic and responsive without being distracting.
