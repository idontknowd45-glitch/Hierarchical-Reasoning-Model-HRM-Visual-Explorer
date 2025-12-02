import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";

module {
  type OldActor = {
    architectureExplanations : OrderedMap.Map<Text, Text>;
    benchmarkData : OrderedMap.Map<Text, Text>;
  };

  type NewActor = {
    architectureExplanations : OrderedMap.Map<Text, Text>;
    benchmarkData : OrderedMap.Map<Text, Text>;
    readmeContent : OrderedMap.Map<Text, Text>;
  };

  public func run(old : OldActor) : NewActor {
    let textMap = OrderedMap.Make<Text>(Text.compare);

    let readmeContent = textMap.put(
      textMap.empty(),
      "README.md",
      "# Hierarchical Reasoning Model (HRM) Visual Explorer\n\n" #
      "## Project Overview\n\n" #
      "The **Hierarchical Reasoning Model (HRM) Visual Explorer** is an interactive educational demo that visualizes how HRM — inspired by human cognition — performs hierarchical reasoning and problem-solving using dual recurrent modules (slow/abstract and fast/detailed).\n\n" #
      "## Key Features\n\n" #
      "- Visual explanations of HRM’s architecture (Cross-Frequency Coupling, Meta-representation, etc.)\n" #
      "- Interactive demos for Sudoku and Maze reasoning, showing how HRM plans and executes\n" #
      "- Benchmark comparison dashboards for tasks like ARC, Sudoku, and Maze\n" #
      "- Beginner-friendly “In Plain Terms” explanations for non-technical users\n" #
      "- Light/dark theme and modern neural-inspired visual design\n\n" #
      "## Architecture\n\n" #
      "- **Frontend:** React + Tailwind CSS\n" #
      "- **Backend:** Motoko canister on the Internet Computer\n" #
      "- Data (architecture explanations and benchmarks) are served via Internet Computer canister queries\n\n" #
      "## Installation and Setup\n\n" #
      "1. **Clone the repository:**\n" #
      "```bash\n" #
      "git clone https://github.com/your-username/hrm-visual-explorer.git\n" #
      "cd hrm-visual-explorer\n" #
      "```\n\n" #
      "2. **Install dependencies:**\n" #
      "```bash\n" #
      "pnpm install\n" #
      "```\n\n" #
      "3. **Run the development server:**\n" #
      "```bash\n" #
      "pnpm dev\n" #
      "```\n\n" #
      "4. **Deploy to Internet Computer:**\n" #
      "```bash\n" #
      "dfx deploy\n" #
      "```\n\n" #
      "## Usage\n\n" #
      "- Main UI flow: Introduction → Architecture → Benchmarks → Interactive Exploration → Footer\n" #
      "- Toggle between “Watch how it thinks” modes in demos for step-by-step reasoning visualization\n\n" #
      "## Screenshots\n\n" #
      "- `generated/brain-hierarchy-diagram.dim_400x300.png`\n" #
      "- `generated/sudoku-thinking-overlay.dim_300x300.png`\n" #
      "- `generated/maze-pathfinding-visual.dim_400x400.png`\n" #
      "- `generated/neural-network-connections.dim_600x400.png`\n" #
      "- `generated/reasoning-process-flow.dim_800x200.png`\n\n" #
      "## Tech Stack\n\n" #
      "- Motoko\n" #
      "- React\n" #
      "- TypeScript\n" #
      "- Tailwind CSS\n" #
      "- Internet Identity (auth)\n" #
      "- React Query\n\n" #
      "## Credits\n\n" #
      "- HRM is a conceptual architecture inspired by neuroscience and human cognitive reasoning models\n" #
      "- Contributors and academic influences acknowledged\n\n" #
      "## License\n\n" #
      "Open-source license (MIT or similar) to be specified\n"
    );

    {
      architectureExplanations = old.architectureExplanations;
      benchmarkData = old.benchmarkData;
      readmeContent;
    };
  };
};
