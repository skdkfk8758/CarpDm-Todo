import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import uuidv1 from 'uuid/v1';
import TodoCell from './TodoCell';


const { width, height } = Dimensions.get('window');

export default class App extends Component {
    state = {
        newToDo: "",
        loadedTodos: false,
        toDos: {}
    };

    componentDidMount = () => {
        this._loadTodos();
    }

    render() {
        const { newToDo, loadedTodos, toDos } = this.state       
        console.log(toDos); 
        if(!loadedTodos) {
            return <AppLoading />
        }
        return ( 
        <View style = { styles.container } >
            <StatusBar barStyle = "light-content" />
            <Text style = { styles.title } > CarpDm To Do </Text>   
            <View style = { styles.card } >
                <TextInput style = { styles.input }
                placeholder = { "New To Do" }
                value = { newToDo }
                onChangeText = { this._controllNewTodo }
                returnKeyType = { "done" }
                autoCorrect={false}
                onSubmitEditing={this._addTodo}
                />  
                <ScrollView contentContainerStyle={styles.todos}>
                    {Object.values(toDos).map(toDo => <TodoCell key={toDo.id} {...toDo} deleteToDo={this._deleteTodo}/>)}
                </ScrollView>
            </View> 
        </View>
        );
    }

    _controllNewTodo = text => {
        this.setState({
            newToDo: text
        })
    };

    _loadTodos = () => {
        this.setState({
            loadedTodos: true
        })
    };

    _addTodo = () => {
        const { newToDo } = this.state;
        if(newToDo !== "") {
            this.setState(prevState => {
                const ID = uuidv1();
                const newTodoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newToDo,
                        createAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newToDo: "",
                    toDos: {
                        ...prevState.toDos,
                        ...newTodoObject
                    }
                };
                return { ...newState }

            })
        }
    };

    _deleteTodo = (id) => {
        this.setState(prevState => {
            const toDos = prevState.toDos;
            delete toDos[id];
            const newState = {
                ...prevState,
                ...toDos
            };
            return { ...newState }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f23657',
        alignItems: 'center'
    },
    title: {
        color: "white",
        fontSize: 30,
        marginTop: 50,
        fontWeight: "200",
        marginBottom: 50
    },
    card: {
        backgroundColor: 'white',
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(50,50,50)',
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 25
    },
    todos: {
        alignItems: 'center',
    }
});