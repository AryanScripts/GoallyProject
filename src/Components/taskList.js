// src/Components/TaskList.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import { useSwipeable } from 'react-swipeable';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CircularProgress from '@mui/material/CircularProgress';
import SearchContainer from './Search'; 

// API Configuration
const API_URL = 'https://devapi.getgoally.com/v1/api/reminders/all';
const AUTH_TOKEN = '2aaed08b-2f37-4547-8ef7-372ff1adad3a';

// Styled Components
const Container = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TaskItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  height: 80px; /* Fixed height for react-window */
  box-sizing: border-box;
  transition: transform 0.3s ease, background-color 0.3s ease;
`;

const TaskImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  margin-right: 16px;
  border-radius: 8px;
`;

const TaskContent = styled.div`
  flex: 1;
`;

const TaskTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const TaskSchedule = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const LoadMoreSpinner = styled.div`
  text-align: center;
  padding: 16px;
`;

const RestoreButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #218838;
  }
`;

// Swipeable Task Item
const SwipeableTaskItem = ({ task, style, onDelete }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onDelete(task._id),
    onSwipedRight: () => onDelete(task._id),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div style={style} {...handlers}>
      <TaskItemWrapper>
        <TaskImage src={task.visualAidUrl || 'https://via.placeholder.com/50'} alt="Task" />
        <TaskContent>
          <TaskTitle>{task.name}</TaskTitle>
          <TaskSchedule>
            <RemoveRedEyeIcon style={{ marginRight: '4px' }} />
            {task.scheduleV2?.timeValue || 'Anytime'}
          </TaskSchedule>
        </TaskContent>
        <IconWrapper>
          <ArrowForwardIosIcon style={{ color: 'black' }} />
        </IconWrapper>
      </TaskItemWrapper>
    </div>
  );
};

const TaskList = () => {
 
  const [tasks, setTasks] = useState([]);
  const [deletedTaskIds, setDeletedTaskIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [limit] = useState(50); 
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const listRef = useRef();

  // Fetch Tasks from API
  const fetchTasks = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
        params: {
          page,
          limit,
        },
      });

      const fetchedTasks = response.data.docs; 

      if (fetchedTasks.length < limit) {
        setHasMore(false);
      }

      setTasks(prevTasks => {
        const newTasks = [...prevTasks, ...fetchedTasks];
        return newTasks;
      });

      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, hasMore, loading]);

  // Initial Fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle Scroll for Pagination
  const handleScroll = useCallback(({ scrollOffset, scrollDirection, scrollUpdateWasRequested, clientHeight, scrollHeight }) => {
    if (scrollOffset + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
      fetchTasks();
    }
  }, [fetchTasks, hasMore, loading]);

  // Handle Delete (Swipe)
  const handleDelete = (id) => {
    setDeletedTaskIds(prev => new Set(prev).add(id));
  };

  // Handle Restore Deleted Items
  const handleRestore = () => {
    setDeletedTaskIds(new Set());
  };

  // Derived Filtered Tasks
  const filteredTasks = React.useMemo(() => {
    let filtered = tasks.filter(task => !deletedTaskIds.has(task._id));
    if (searchTerm) {
      filtered = filtered.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  }, [tasks, deletedTaskIds, searchTerm]);

  // Persist Deleted Tasks in LocalStorage (Optional)
  useEffect(() => {
    const storedDeleted = localStorage.getItem('deletedTaskIds');
    if (storedDeleted) {
      setDeletedTaskIds(new Set(JSON.parse(storedDeleted)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('deletedTaskIds', JSON.stringify(Array.from(deletedTaskIds)));
  }, [deletedTaskIds]);

  // Render Each Item
  const Item = ({ index, style }) => {
    const task = filteredTasks[index];
    if (!task) return null;

    return (
      <SwipeableTaskItem
        task={task}
        style={style}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <Container>
      <Header>
        <SearchContainer setSearchTerm={setSearchTerm} /> 
      </Header>

      <List
        height={600} 
        itemCount={filteredTasks.length}
        itemSize={80} 
        width={'100%'}
        onScroll={handleScroll}
        ref={listRef}
      >
        {Item}
      </List>

      {loading && (
        <LoadMoreSpinner>
          <CircularProgress />
        </LoadMoreSpinner>
      )}

      <RestoreButton onClick={handleRestore}>Restore Deleted Items</RestoreButton>
    </Container>
  );
};

export default TaskList;
