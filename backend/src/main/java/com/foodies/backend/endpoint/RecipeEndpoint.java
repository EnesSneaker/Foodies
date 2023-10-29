package com.foodies.backend.endpoint;



import com.foodies.backend.DTO.RecipeResponse;
import com.foodies.backend.service.RecipeEndpointService;
import com.foodies.backend.DTO.RecipeRequest;
import com.foodies.backend.data.UnitEnum;
import com.foodies.backend.security.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173",
        "http://13.51.176.163:5173",
        "http://127.0.0.11",
        "http://172.26.0.2",
        "http://frontend"})
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeEndpoint {

    private final RecipeEndpointService recipeService;
    private final JwtService jwtService;

    @GetMapping("/{type}")
    public List<RecipeResponse> getRecipesByFlavourType(@PathVariable String type){
            return recipeService.getRecipesByFlavourType(type);
    }

    @GetMapping("/units")
    public List<UnitEnum> getUnits() {
        return List.of(UnitEnum.values());
    }

    @GetMapping("/list")
    public ResponseEntity<List<RecipeResponse>> getAllRecipes() {
        List<RecipeResponse > recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<RecipeResponse> getRecipe(@PathVariable Long id) {
        RecipeResponse recipe = recipeService.getRecipe(id);
        return ResponseEntity.ok(recipe);
    }

    @GetMapping("/user")
    public List<RecipeResponse> findRecipesByUser_Username(@RequestHeader String authorization){
        System.out.println("request arrives");
        String pureToken = authorization.substring(7);
        String username = jwtService.extractUsername(pureToken);
        return recipeService.findRecipesByUser_Username(username);
    }




    @PostMapping("/post")
    public ResponseEntity<RecipeResponse> postRecipe(@RequestBody RecipeRequest recipeRequest, @RequestHeader String authorization) {
        String pureToken = authorization.substring(7);
        String username = jwtService.extractUsername(pureToken);
        RecipeResponse savedRecipe = recipeService.postRecipe(recipeRequest, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    @PutMapping("/update/{id}")
    public RecipeResponse updateRecipe(@PathVariable Long id, @RequestBody RecipeRequest recipeRequest){
        return recipeService.updateRecipe(id, recipeRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build();
    }



}

