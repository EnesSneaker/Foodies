package com.foodies.backend.endpoint;

import com.foodies.backend.DTO.CommentRequest;
import com.foodies.backend.DTO.RecipeCommentDTO;
import com.foodies.backend.data.RecipeComment;
import com.foodies.backend.data.RecipeCommentRepository;
import com.foodies.backend.security.config.JwtService;
import com.foodies.backend.service.CommentEndpointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = {"http://localhost:5173",
        "http://13.51.176.163:5173",
        "http://127.0.0.11",
        "http://172.26.0.2",
        "http://frontend"})
@RequiredArgsConstructor
public class CommentEndpoint {

    private final JwtService jwtService;
    private final CommentEndpointService service;

    @GetMapping("/{id}")
    public ResponseEntity<List<RecipeCommentDTO>> getCommentsForRecipe (@PathVariable Long id) {

        List<RecipeCommentDTO> comments = service.getCommentsForRecipe(id);

        return ResponseEntity.ok().body(comments);
    }

    @PostMapping("/{id}")
    public ResponseEntity<RecipeCommentDTO> postCommentForRecipe(@PathVariable Long id, @RequestBody CommentRequest request, @RequestHeader String authorization){
        String pureToken = authorization.substring(7);
        String username = jwtService.extractUsername(pureToken);
        System.out.println(username);
        RecipeCommentDTO savedComment = service.postComment(id, username, request);
        return ResponseEntity.ok().body(savedComment);
    }
}
