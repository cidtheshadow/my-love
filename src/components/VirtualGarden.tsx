import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Plant {
  id: number;
  stage: number;
  lastWatered: number;
  position: { x: number; y: number };
}

const plantStages = ["🌱", "🌿", "🌺", "🌸", "🌹"];

export default function VirtualGarden() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null);
  const [gardenLevel, setGardenLevel] = useState(1);

  const getGridPositions = () => {
    const positions = [];
    const size = 6;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        positions.push({ x, y });
      }
    }
    return positions;
  };

  const plantSeed = (position: { x: number; y: number }) => {
    const existingPlant = plants.find(p => p.position.x === position.x && p.position.y === position.y);
    if (existingPlant) {
      toast("There's already a plant growing here! 🌱");
      return;
    }

    const newPlant: Plant = {
      id: Date.now(),
      stage: 0,
      lastWatered: Date.now(),
      position,
    };

    setPlants([...plants, newPlant]);
    setSelectedPosition(null);
    toast("You planted a seed! 🌱 Remember to water it!");
  };

  const waterPlant = (plantId: number) => {
    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        const newStage = Math.min(plant.stage + 1, plantStages.length - 1);
        const growthMessage = newStage > plant.stage ? " Your plant grew! 🌱✨" : " Your plant is happy! 💧";
        
        toast(`Plant watered!${growthMessage}`);
        
        return {
          ...plant,
          stage: newStage,
          lastWatered: Date.now(),
        };
      }
      return plant;
    }));
  };

  const getPlantAtPosition = (x: number, y: number) => {
    return plants.find(plant => plant.position.x === x && plant.position.y === y);
  };

  const getTotalGrowthPoints = () => {
    return plants.reduce((total, plant) => total + plant.stage, 0);
  };

  useEffect(() => {
    const points = getTotalGrowthPoints();
    const newLevel = Math.floor(points / 10) + 1;
    if (newLevel > gardenLevel) {
      setGardenLevel(newLevel);
      toast(`🎉 Garden level up! You're now level ${newLevel}! Your love makes everything grow! 💕`);
    }
  }, [plants, gardenLevel]);

  const clearGarden = () => {
    setPlants([]);
    setGardenLevel(1);
    setSelectedPosition(null);
    toast("Garden cleared! Ready for a fresh start! 🌱");
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-romantic font-bold mb-8 text-foreground">
          Our Love Garden 🌺
        </h2>
        
        <Card variant="love" className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Grow our garden together!</CardTitle>
            <div className="flex justify-center gap-6 text-lg">
              <span>Garden Level: {gardenLevel}</span>
              <span>Plants: {plants.length}</span>
              <span>Growth Points: {getTotalGrowthPoints()}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2 mb-6 p-4 bg-soft-gradient rounded-lg">
              {getGridPositions().map(({ x, y }) => {
                const plant = getPlantAtPosition(x, y);
                const isSelected = selectedPosition?.x === x && selectedPosition?.y === y;
                
                return (
                  <button
                    key={`${x}-${y}`}
                    onClick={() => {
                      if (plant) {
                        waterPlant(plant.id);
                      } else {
                        if (isSelected) {
                          plantSeed({ x, y });
                        } else {
                          setSelectedPosition({ x, y });
                        }
                      }
                    }}
                    className={`aspect-square rounded-lg text-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                      plant 
                        ? 'bg-romantic-gradient shadow-soft hover:shadow-romantic' 
                        : isSelected
                        ? 'bg-accent border-2 border-primary animate-pulse-soft'
                        : 'bg-muted hover:bg-secondary border-2 border-dashed border-border'
                    }`}
                  >
                    {plant ? plantStages[plant.stage] : isSelected ? '✨' : '🌱'}
                  </button>
                );
              })}
            </div>
            
            <div className="text-sm text-muted-foreground mb-4">
              Click empty spots to plant seeds 🌱 • Click plants to water them 💧
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button 
                variant="romantic" 
                onClick={() => setSelectedPosition(null)}
                disabled={!selectedPosition}
              >
                Cancel Selection
              </Button>
              <Button variant="cute" onClick={clearGarden}>
                Clear Garden
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-sunset-gradient rounded-lg">
              <p className="text-sm font-medium">
                💡 Tip: Each plant you grow represents our growing love! 
                Water them to help our garden flourish! 🌺💕
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}