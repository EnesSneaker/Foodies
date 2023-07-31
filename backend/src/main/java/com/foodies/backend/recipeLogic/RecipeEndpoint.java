package com.foodies.backend.recipeLogic;



import com.foodies.backend.recipeLogic.dbConnection.Recipe;
import com.foodies.backend.recipeLogic.dbConnection.RecipeDTO;
import com.foodies.backend.security.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeEndpoint {

    private final RecipeEndpointService recipeService;

    @GetMapping("/{type}")
    public List<RecipeDTO> getRecipesByFlavourType(@PathVariable String type){
            return recipeService.getRecipesByFlavourType(type);
    }

    @GetMapping("/list")
    public ResponseEntity<List<RecipeDTO>> getAllRecipes() {
        List<RecipeDTO> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<RecipeDTO> getRecipe(@PathVariable Long id) {
        RecipeDTO recipe = recipeService.getRecipe(id);
        return ResponseEntity.ok(recipe);
    }

    @GetMapping("/user/{username}")
    public List<RecipeDTO> findRecipesByUser_Username(@PathVariable String username){ //String username für Frontend wegen token
        return recipeService.findRecipesByUser_Username(username);
    }


    @PostMapping("/post/{username}")
    public ResponseEntity<RecipeDTO> postRecipe(@RequestBody RecipeDTO recipeDTO, @PathVariable String username) {
        RecipeDTO savedRecipe = recipeService.postRecipe(recipeDTO, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

}

