import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Board from './Board';

const Jeopardy = ({ game }) => {

    if (!game) return (<div>no game</div>)

    const [categories, setCategories] = useState({});

    const loadGame = async () => {
        console.log(game)
        let gameState = localStorage.getItem(game.slug);
        console.log("game state: ", gameState)
        if (gameState) {
            setCategories(JSON.parse(gameState));
        } else {
            const { data, error } = await supabase
                .from(game.type)
                .select('category, value, question, solution')
                .eq('game', game.id)
                .order('category', { ascending: true })
                .order('value', { ascending: true });

            console.log("fetched data :", data)

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            // Transform data and set state
            let transformedCategories = transformData(data);
            setCategories(transformedCategories);
            localStorage.setItem(game.slug, JSON.stringify(transformedCategories));
        }
    };

    useEffect(() => {
        loadGame();
    }, [game]);

    const transformData = (data) => {
        let categories = {};
        data.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = { questions: {} };
            }
            categories[item.category].questions[item.value] = {
                question: item.question,
                solution: item.solution,
                answered: false
            };
        });
        return categories;
    };

    const markQuestionAsAnswered = (categoryName, value) => {
        setCategories(prevCategories => {
            let newCategories = { ...prevCategories };
            newCategories[categoryName].questions[value].answered = true;
            localStorage.setItem(game.slug, JSON.stringify(newCategories));
            return newCategories;
        });
    };

    console.log("cats :", categories)
    return (
        <Board categories={categories} onAnswered={markQuestionAsAnswered} />
    );
};

export default Jeopardy;