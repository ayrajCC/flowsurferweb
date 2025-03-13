import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import Menu from './components/Menu';
import { ShapeType } from './utils/shapeUtils';
import apiService from './services/apiService';
import './App.css';

function App() {
  const [currentShapeType, setCurrentShapeType] = useState(ShapeType.PROCESS);
  const [selectedShape, setSelectedShape] = useState(null);
  const [currentDiagram, setCurrentDiagram] = useState({
    name: 'Untitled Diagram',
    shapes: []
  });
  
  // Handler for shape selection
  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
  };
  
  // Handler for fill color change
  const handleFillColorChange = (color) => {
    if (!selectedShape) return;
    
    // Update the selected shape
    const updatedShape = { ...selectedShape, fillColor: color };
    setSelectedShape(updatedShape);
    
    // Update the shape in the diagram
    const updatedShapes = currentDiagram.shapes.map(shape => 
      shape.id === selectedShape.id ? updatedShape : shape
    );
    
    setCurrentDiagram({
      ...currentDiagram,
      shapes: updatedShapes
    });
  };
  
  // Handler for stroke color change
  const handleStrokeColorChange = (color) => {
    if (!selectedShape) return;
    
    // Update the selected shape
    const updatedShape = { ...selectedShape, strokeColor: color };
    setSelectedShape(updatedShape);
    
    // Update the shape in the diagram
    const updatedShapes = currentDiagram.shapes.map(shape => 
      shape.id === selectedShape.id ? updatedShape : shape
    );
    
    setCurrentDiagram({
      ...currentDiagram,
      shapes: updatedShapes
    });
  };
  
  // Handler for text editing
  const handleEditText = () => {
    if (!selectedShape || selectedShape.type === ShapeType.LINE) return;
    
    const text = window.prompt('Edit text:', selectedShape.text || '');
    if (text !== null) {  // Check for cancel
      // Update the selected shape
      const updatedShape = { ...selectedShape, text };
      setSelectedShape(updatedShape);
      
      // Update the shape in the diagram
      const updatedShapes = currentDiagram.shapes.map(shape => 
        shape.id === selectedShape.id ? updatedShape : shape
      );
      
      setCurrentDiagram({
        ...currentDiagram,
        shapes: updatedShapes
      });
    }
  };
  
  // Handler for new diagram
  const handleNewDiagram = () => {
    setCurrentDiagram({
      name: 'Untitled Diagram',
      shapes: []
    });
    setSelectedShape(null);
  };
  
  // Handler for opening a diagram
  const handleOpenDiagram = (diagram) => {
    setCurrentDiagram(diagram);
    setSelectedShape(null);
  };
  
  // Handler for saving a diagram
  const handleSaveDiagram = async (name) => {
    try {
      const diagramToSave = {
        ...currentDiagram,
        name
      };
      
      const response = await apiService.createDiagram(diagramToSave);
      setCurrentDiagram(response.data);
      alert('Diagram saved successfully!');
    } catch (error) {
      console.error('Error saving diagram:', error);
      throw error;
    }
  };
  
  return (
    <div className="App">
      <Menu 
        onNewDiagram={handleNewDiagram}
        onOpenDiagram={handleOpenDiagram}
        onSaveDiagram={handleSaveDiagram}
      />
      <Toolbar 
        currentShape={currentShapeType}
        setCurrentShape={setCurrentShapeType}
        selectedShape={selectedShape}
        onFillColorChange={handleFillColorChange}
        onStrokeColorChange={handleStrokeColorChange}
        onEditText={handleEditText}
      />
      <Canvas 
        currentShapeType={currentShapeType}
        onShapeSelect={handleShapeSelect}
      />
    </div>
  );
}

export default App;