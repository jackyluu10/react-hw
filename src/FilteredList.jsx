import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List'; 

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '', // Search term
            selectedType: 'all' // Initially show all produce
        };
    }
    
    // Event handler for when an item in the dropdown is selected
    handleDropdownSelect = (type) => {
        this.setState({ selectedType: type });
    }

    // Event handler for when the user types on the search bar
    onSearch = (event) => {
        this.setState({ search: event.target.value.trim().toLowerCase() });
    }

    // Method to filter produce based on search term and selected type
    filterItem = (item) => {
        const { search, selectedType } = this.state;
        const itemName = item.name.toLowerCase();

        // Check if the current search term is contained in this item's name
        const isMatched = itemName.includes(search);

        // Check if the item's type matches the selected type or if the selected type is 'all'
        const isTypeMatched = selectedType === 'all' || item.type === selectedType;

        return isMatched && isTypeMatched;
    }

    render() {
        return (
            <div className="filter-list">
                <h1>Produce Search</h1>
                <DropdownButton id="typeDropdown" title="Type Selection" onSelect={this.handleDropdownSelect}>

                    <Dropdown.Item eventKey="all">All</Dropdown.Item> <br />
                    <Dropdown.Item eventKey="Fruit">Fruit</Dropdown.Item> <br /> 
                    <Dropdown.Item eventKey="Vegetable">Vegetable</Dropdown.Item><br />
                </DropdownButton>
                <br />
                <br />
                <input type="text" placeholder="Search" onChange={this.onSearch} />
                <br/>
                <br/>

                <List items={this.props.items.filter(this.filterItem)} />
            </div>
        );
    }
}

export default FilteredList;


