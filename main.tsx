import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

import Migration "migration";

(with migration = Migration.run)
actor HRMVisualExplorer {
  transient let textMap = OrderedMap.Make<Text>(Text.compare);

  var architectureExplanations = textMap.fromIter<Text>(
    Iter.fromArray([
      ("Cross Frequency Coupling", "Cross Frequency Coupling refers to the interaction between different neural oscillation frequencies, enabling complex information processing and coordination across brain regions."),
      ("Meta-representation", "Meta-representation involves the brain's ability to create abstract representations of concepts, allowing for higher-level reasoning and flexible problem-solving."),
      ("Fast vs. Slow modules", "Fast modules handle rapid, routine processing tasks, while slow modules are responsible for deliberate, complex reasoning and learning new patterns."),
      ("Hierarchical Processing", "Hierarchical processing organizes information flow from simple to complex, mirroring the brain's structure for efficient reasoning and learning."),
    ])
  );

  var benchmarkData = textMap.fromIter<Text>(
    Iter.fromArray([
      ("ARC-1", "HRM achieves 92% accuracy on ARC-1 with 960 training examples, outperforming traditional models by 15%."),
      ("ARC-2", "On ARC-2 with 1120 training examples, HRM reaches 89% accuracy, demonstrating superior generalization capabilities."),
      ("Sudoku Extreme", "HRM solves 9x9 Sudoku puzzles with 94% accuracy using 1000 training examples, showcasing advanced reasoning skills."),
      ("Maze Hard", "In 30x30 maze tasks, HRM achieves 87% accuracy with 1000 training examples, excelling in complex pathfinding scenarios."),
    ])
  );

  var readmeContent = textMap.fromIter<Text>(
    Iter.fromArray([
      (
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
      ),
    ])
  );

  public query func getArchitectureExplanation(concept : Text) : async ?Text {
    textMap.get(architectureExplanations, concept);
  };

  public query func getAllArchitectureExplanations() : async [(Text, Text)] {
    Iter.toArray(textMap.entries(architectureExplanations));
  };

  public query func getBenchmarkData(task : Text) : async ?Text {
    textMap.get(benchmarkData, task);
  };

  public query func getAllBenchmarkData() : async [(Text, Text)] {
    Iter.toArray(textMap.entries(benchmarkData));
  };

  public query func getReadmeContent() : async ?Text {
    textMap.get(readmeContent, "README.md");
  };
};
