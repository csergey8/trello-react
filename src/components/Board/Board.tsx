import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCardByIdSelector } from '../../redux/cards';

let params: any;

const Board = (props: any) => {
  params = useParams();
  console.log(params.id);
  return (
    <div>board</div>
  );
};



const mapStateToProps = (state: any) => ({
  cards: state.cardsReducer.cards
})

const BoardWithRedux = connect(mapStateToProps)(Board);

export { BoardWithRedux as Board };




