import React from 'react';
import { connect } from 'react-redux';
import { startEditWord } from '../actions/words';
import StudySelectionOption from './StudySelectOption';

export class StudyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWord: props.words[0],
            words: props.words,
            showAnswer: false
        };
    };

    onShowAnswer = () => {
        this.setState(() => ({ showAnswer: true }));
    };

    calculateNewSchedule = (grade) => {
        let currentWord = this.state.currentWord
        const oldEF = currentWord.easeFactor;
        let nextDate = new Date();
        
        if (grade < 3 || grade > 5) {
            currentWord.reps = 0;
            currentWord.interval = 0;
        } else {
             currentWord.easeFactor = Math.max(oldEF - 0.8 + 0.28 * grade - 0.02 * grade * grade, 1.3);

            currentWord.reps += 1;

            switch (currentWord.reps) {
            case 1:
                currentWord.interval = 1;
                break;
            case 2:
                currentWord.interval = 6;
                break;
            default: 
                currentWord.interval = Math.ceil((currentWord.reps - 1) * currentWord.easeFactor);
                break;
            }
        }

        if (grade === 3) {
            currentWord.interval = 0;
        }

        const today = new Date();
        nextDate.setDate(today.getDate() + currentWord.interval);
        currentWord.repeatAt = nextDate.getTime();

        const words = this.state.words;
        const newWords = currentWord.interval === 0 
            ? words.push(words.splice(words.indexOf(element), 1)[0]) 
            : words.slice(1);
        console.log('New words:', newWords);
        this.setState(() => ({ words: newWords, currentWord: newWords[0], showAnswer: false }));
        this.props.startEditWord(currentWord.id, {
            repeatAt: currentWord.repeatAt,
            interval: currentWord.interval,
            reps: currentWord.reps,
            easeFactor: currentWord.easeFactor
        });

        if (newWords.length === 0) {
            this.props.history.push('/');
        }        
    };

    render() {
        return (
            <div>
                <h2>Study!</h2>
                {this.state.currentWord && <p>{this.state.currentWord.source}</p>}
                {this.state.showAnswer && <p>{this.state.currentWord.destination}</p>}
                {
                    this.state.showAnswer && 
                    <div>
                        <StudySelectionOption 
                            grade={0} 
                            key={0}
                            text="Again" 
                            timeText="<1m"
                            calculateNewSchedule={this.calculateNewSchedule} 
                        />
                        <StudySelectionOption 
                            grade={3} 
                            key={3}
                            text="Hard" 
                            timeText="<10m"
                            calculateNewSchedule={this.calculateNewSchedule} 
                        />
                        <StudySelectionOption 
                            grade={4} 
                            key={4}
                            text="Good" 
                            timeText="1d"
                            calculateNewSchedule={this.calculateNewSchedule} 
                        />
                        <StudySelectionOption 
                            grade={5}
                            key={5} 
                            text="Easy" 
                            timeText="4d"
                            calculateNewSchedule={this.calculateNewSchedule} 
                        />
                    </div>
                }
                {!this.state.showAnswer && <button onClick={this.onShowAnswer}>Show answer</button>}

            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    words: state.words
});

const mapDispatchToProps = (dispatch) => ({
    startEditWord: (id, word) => dispatch(startEditWord(id, word))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyPage);