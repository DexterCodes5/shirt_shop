package dev.dex.springbootshirtshop.service;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.repository.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.*;
import org.mockito.*;
import org.mockito.junit.jupiter.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {
    @Mock
    private QuestionRepository questionRepository;
    private QuestionService underTest;

    @BeforeEach
    void setUp() {
        underTest = new QuestionService(questionRepository);
    }

    @Test
    void canSave() {
        // given
        Question question = new Question();

        // when
        underTest.save(question);

        // then
        ArgumentCaptor<Question> questionArgumentCaptor = ArgumentCaptor.forClass(Question.class);
        verify(questionRepository).save(questionArgumentCaptor.capture());
        assertThat(questionArgumentCaptor.getValue()).isEqualTo(question);
    }
}