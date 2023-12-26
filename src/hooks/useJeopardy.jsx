import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

const useJeopardy = (game) => {

    const [categories, setCategories] = useState({});

    const loadGame = async () => {
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

    return { categories, markQuestionAsAnswered }
};


export default useJeopardy;