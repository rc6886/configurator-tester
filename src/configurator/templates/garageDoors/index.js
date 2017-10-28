import React from 'react';

const TemplateDiv = ({text}) => {
  return (
      <div>
          {text}
      </div>
  );
};

const Height = () => <TemplateDiv text="This is the garage height." />;
const Width = () => <TemplateDiv text="This is the garage width." />;
const GarageSize = () => <TemplateDiv text="This is the garage size." />;
const GarageDesign = () => <TemplateDiv text="This is the garage design." />;
const GarageConstruction = () => <TemplateDiv text="This is the garage construction." />;
const GarageTopSection = () => <TemplateDiv text="This is the garage top section." />;
const GarageGlassType = () => <TemplateDiv text="This is the garage glass type." />;

class Ungrouped extends React.Component {
  render() {
    return (
      <div>
        This is the ungrouped template.
        <div>{this.props.children}</div>
      </div>
    );
  }
}

class Size extends React.Component {
  render() {
    return (
      <div>
        This is the size group template.
        <p>{this.props.children}</p>
      </div>
    );
  }
}

export let groups = [
  { name: "Ungrouped", template: Ungrouped },
  { name: "Size", template: Size }
];

export const options = [
  { name: 'Height', template: <Height /> },
  { name: 'Width', template: <Width /> },
  { name: 'Garage_Size_Type', template: <GarageSize /> },
  { name: 'Garage_ReserveWood_Design2', template: <GarageDesign /> },
  { name: 'Garage_ReserveWood_Construction', template: <GarageConstruction /> },
  { name: 'Garage_ReserveWood_TopSection', template: <GarageTopSection /> },
  { name: 'Garage_ReserveWood_GlassType', template: <GarageGlassType /> },
];


