import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

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
};
