import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import PropsTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default class ToDoCell extends Component {
    constructor(props) {
        super(props);
        this.state = { isEditing: false,  text: props.text }
    }

    static propTypes = {
        text: PropsTypes.string,
        isCompleted: PropsTypes.bool,
        id: PropsTypes.string,
        deleteToDo: PropsTypes.func
    }
    render() {
        const { isCompleted, isEditing,todoValue } = this.state
        const { text, id, deleteToDo } = this.props;
        return (
             <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={ [
                            styles.circle, 
                            isCompleted ? styles.completeCircle : styles.uncompleteCircle
                            ]}></View>
                    </TouchableOpacity>
                    {isEditing ? (<TextInput style={[styles.input, isCompleted ? styles.completeText : styles.uncompleteText]} value={todoValue} multiline={true} onChangeText={this._controllText} returnKeyType={"done"} onBlur={this._finishEdit}/>) : (
                        <Text style={[styles.text, isCompleted ? styles.completeText : styles.uncompleteText]}>
                        {text}
                    </Text>
                    ) }
                </View>

                 {isEditing ? (
                     <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEdit}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>☑</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                 ) : (
                     <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEdit}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => deleteToDo(id) }>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>╳</Text>
                            </View>
                        </TouchableOpacity>
                     </View>
                     
                 ) }

             </View>
        );
    }

   _toggleComplete = () => {
       this.setState(prevState => {
           return { isCompleted: !prevState.isCompleted };
       })
   }

   _startEdit = () => {
        this.setState({ isEditing: true })
   }

   _finishEdit = () => {
        this.setState({
            isEditing: false
        })
   }
   
   _controllText = (text) => {
       this.setState({ todoValue: text })
   }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/2,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20,
    },
    completeCircle: {
        borderColor: '#bbb',
    },
    uncompleteCircle: {
        borderColor: 'red',
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    }, 
    completeText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    uncompleteText: {
        color: '#353535',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width/2,
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    }

})